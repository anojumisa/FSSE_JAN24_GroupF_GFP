// components/Map.tsx
import React from "react";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";

const geoUrl = "https://github.com/tvalentius/Indonesia-topojson/blob/master/indonesia-topojson-city-regency.json"; // Make sure this file is in your public folder

const Map: React.FC = () => {
	return (
		<ComposableMap projection="geoMercator">
			<Geographies geography={geoUrl}>
				{({ geographies }) =>
					geographies.map((geo) => (
						<Geography key={geo.rsmKey} geography={geo} />
					))
				}
			</Geographies>
		</ComposableMap>
	);
};

export default Map;
