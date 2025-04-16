import React, { useRef, useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import * as topojson from 'topojson-client';
import * as d3 from 'd3-array';
import { normalizeCountryName } from '../utils/countries';

const vertex = (point, radius) => {
  const lambda = point[0] * Math.PI / 180;
  const phi = point[1] * Math.PI / 180;
  const cosPhi = Math.cos(phi);
  return new THREE.Vector3(
    radius * cosPhi * Math.cos(lambda),
    radius * Math.sin(phi),
    -radius * cosPhi * Math.sin(lambda)
  );
};

const createWireframeGeometry = (feature, radius) => {
  const geometry = new THREE.BufferGeometry();
  const vertices = [];

  const processCoordinates = (coords) => {
    coords.forEach(ring => {
      const lineVertices = ring.map(point => vertex(point, radius));
      d3.pairs(lineVertices, (a, b) => {
        vertices.push(a.x, a.y, a.z, b.x, b.y, b.z);
      });
    });
  };

  if (feature.geometry?.type === 'Polygon') {
    processCoordinates(feature.geometry.coordinates);
  } else if (feature.geometry?.type === 'MultiPolygon') {
    feature.geometry.coordinates.forEach(polygon => processCoordinates(polygon));
  } else if (feature.type === 'MultiLineString') {
    feature.coordinates.forEach(line => {
      const lineVertices = line.map(point => vertex(point, radius));
      d3.pairs(lineVertices, (a, b) => {
        vertices.push(a.x, a.y, a.z, b.x, b.y, b.z);
      });
    });
  }

  geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
  return geometry;
};

const graticule10 = () => {
  const epsilon = 1e-6;
  const x1 = 180, x0 = -x1, y1 = 80, y0 = -y1, dx = 10, dy = 10;
  const X1 = 180, X0 = -X1, Y1 = 90, Y0 = -Y1, DX = 90, DY = 360;
  const x = graticuleX(y0, y1, 2.5), y = graticuleY(x0, x1, 2.5);
  const X = graticuleX(Y0, Y1, 2.5), Y = graticuleY(X0, X1, 2.5);

  function graticuleX(y0, y1, dy) {
    const y = d3.range(y0, y1 - epsilon, dy).concat(y1);
    return x => y.map(y => [x, y]);
  }

  function graticuleY(x0, x1, dx) {
    const x = d3.range(x0, x1 - epsilon, dx).concat(x1);
    return y => x.map(x => [x, y]);
  }

  return {
    type: "MultiLineString",
    coordinates: d3.range(Math.ceil(X0 / DX) * DX, X1, DX).map(X)
      .concat(d3.range(Math.ceil(Y0 / DY) * DY, Y1, DY).map(Y))
      .concat(d3.range(Math.ceil(x0 / dx) * dx, x1, dx).filter(x => Math.abs(x % DX) > epsilon).map(x))
      .concat(d3.range(Math.ceil(y0 / dy) * dy, y1 + epsilon, dy).filter(y => Math.abs(y % DY) > epsilon).map(y))
  };
};

export const Globe = ({ 
  isInteracting, 
  highlightedCountry, 
  position = [0, -0.35, -2],
  rotationDirection = 1,
  countryColor = '#1db954'
}) => {
  const globeRef = useRef();
  const graticuleRef = useRef();
  const groupRef = useRef();
  const [countries, setCountries] = useState([]);
  const [graticuleGeometry, setGraticuleGeometry] = useState(null);
  const radius = 2;
  const targetPosition = useRef(new THREE.Vector3(...position));
  const animationSpeed = 0.1;

  useEffect(() => {
    targetPosition.current.set(...position);
  }, [position]);

  useEffect(() => {
    fetch("https://cdn.jsdelivr.net/npm/world-atlas@2/countries-50m.json")
      .then(res => res.json())
      .then(topology => {
        const countries = topojson.feature(topology, topology.objects.countries).features;
        const geometries = countries.map(country => ({
          geometry: createWireframeGeometry(country, radius),
          name: country.properties.name,
          normalizedName: normalizeCountryName(country.properties.name),
          originalCountry: country
        }));
        setCountries(geometries);
        setGraticuleGeometry(createWireframeGeometry(graticule10(), radius));
      });
  }, []);

  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.position.lerp(targetPosition.current, animationSpeed);
    }

    if (!isInteracting.current) {
      if (globeRef.current) globeRef.current.rotation.y += delta * 0.2 * rotationDirection;
      if (graticuleRef.current) graticuleRef.current.rotation.y += delta * 0.2 * rotationDirection;
    }
  });

  return (
    <group ref={groupRef}>
      <group ref={globeRef}>
        {countries.map((country, i) => {
          const searchNormalized = normalizeCountryName(highlightedCountry);
          const shouldShow = !highlightedCountry || 
                          country.normalizedName === searchNormalized ||
                          country.name.toLowerCase().includes(searchNormalized) ||
                          searchNormalized.includes(country.normalizedName);
          
          return shouldShow ? (
            <lineSegments key={i} geometry={country.geometry}>
              <lineBasicMaterial color={countryColor} linewidth={1} />
            </lineSegments>
          ) : null;
        })}
      </group>
      {graticuleGeometry && (
        <lineSegments ref={graticuleRef} geometry={graticuleGeometry}>
          <lineBasicMaterial color="#333333" /> {/* Always stays dark gray */}
        </lineSegments>
      )}
    </group>
  );
};