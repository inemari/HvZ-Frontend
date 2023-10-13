import MapContent from './MapContent';
import map from '../../assets/images/Map1.png';

const Map = () => {
  return (
    <div className="container rounded-lg relative aspect-square bg-cover bg-clip-content md:aspect-[2/1]" style={{ backgroundImage: `url(${map})` }}>
      <MapContent />
    </div>
  );
};
export default Map;