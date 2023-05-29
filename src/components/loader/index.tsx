import Ball from 'assets/800px-Soccerball.png';

export default function Loader() {
  return (
    <div className="w-full h-full absolute flex  items-center justify-center flex-col">
      <div className="w-full h-full absolute opacity-70 bg-gray-400" />
      <img className="w-16 h-16 animate-spin" src={Ball} alt="bola futebol" />
    </div>
  );
}
