// react component tp display the card with image and title with tailwind css styled

const Card = () => {
  return (
    <div className="flex flex-col items-center p-8 gap-4 mb-8 bg-zinc-800 rounded-lg shadow-lg">
      <img
        className="rounded-xl"
        width="200"
        height="200"
        src="https://picsum.photos/200"
        alt="image"
      />
      <h2 className="text-2xl text-white font-bold">Card Component</h2>
    </div>
  );
};

export default Card;
