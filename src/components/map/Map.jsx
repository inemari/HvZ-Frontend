import MapContent from './MapContent';
import map from '../../assets/images/Map1.png';

const Map = () => {
  return (
    <div className="container rounded-lg  aspect-square bg-cover bg-clip-content relative" style={{ backgroundImage: `url(${map})` }}>
      <MapContent />
    </div>
  );
};
export default Map;