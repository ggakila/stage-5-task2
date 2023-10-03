import { useRef, useState, useEffect } from "react";
import Image from "next/image";

export default function Home() {
  const characterRef = useRef(null);
  const [isCharacterMoving, setIsCharacterMoving] = useState(false);
  const [showMessage, setShowMessage] = useState(false);

  const moveCharacterTowardsButton = () => {
    const button = document.querySelector(".move-button");
    const character = characterRef.current;

    if (!isCharacterMoving) {
      const deltaX = button.offsetLeft - character.offsetLeft - 100;
      const deltaY = button.offsetTop - character.offsetTop - 100;

      character.style.transition = "transform 1s ease-in-out";
      character.style.transform = `translate(${deltaX}px, ${deltaY}px)`;

      setIsCharacterMoving(true); // Set character movement state to true
    } else {
      // Reset character transformation and movement state
      resetCharacter();
    }
  };

  const resetCharacter = () => {
    const character = characterRef.current;
    character.style.transition = "none";
    character.style.transform = "translate(0, 0)";
    setIsCharacterMoving(false);
    setShowMessage(false); // Hide the message when resetting
  };

  useEffect(() => {
    if (isCharacterMoving) {
      const button = document.querySelector(".move-button");
      const character = characterRef.current;

      const checkMovement = setInterval(() => {
        const characterRect = character.getBoundingClientRect();
        const buttonRect = button.getBoundingClientRect();

        // Check if the character has reached the button
        if (
          characterRect.left <= buttonRect.left &&
          characterRect.right >= buttonRect.right &&
          characterRect.top <= buttonRect.top &&
          characterRect.bottom >= buttonRect.bottom
        ) {
          clearInterval(checkMovement);
          setShowMessage(true); // Show the message when the character reaches the button
        }
      }, 100);
    } else {
      // Hide the message when resetting
      setShowMessage(false);
    }
  }, [isCharacterMoving]);

  return (
    <div className="w-full bg-gray-200 h-screen text-black relative flex flex-col justify-center">
      <h1 className="absolute text-[50px] text-center top-0 right-1/2 font-bold">
        The aliens are here
      </h1>
      <Image
        src="/helper.png"
        width={100}
        height={300}
        ref={characterRef}
        className="character absolute w-[100px] h-[100px] bottom-1/4 left-[40px] "
        alt="helper"
      />

      <div className="bg-blue-400 h-full "></div>
      <div className="w-full bg-green-700 h-1/6 bottom-0 absolute"></div>
      <button
        className="absolute text-black bottom-1/4 right-[20px] bg-purple-400 px-[20px] py-[10px] text-[30px] font-bold border rounded-[30px] move-button"
        onClick={moveCharacterTowardsButton}
      >
        {isCharacterMoving ? "Reset" : "Click me"}
      </button>
      {showMessage && (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-4 rounded-lg shadow-lg">
          <p className="text-[20px] text-gray-900">
            Greetings, Earthlings! We come in peace from a distant galaxy. Our
            journey across the cosmos has brought us to your beautiful planet.
            We seek to establish peaceful relations and share knowledge with
            your species. Fear not, for our intentions are benevolent, and we
            hope to foster harmony and cooperation among all intelligent life
            forms in the universe.
          </p>
          <button
            className="mt-4 bg-blue-400 text-white px-4 py-2 rounded hover:bg-blue-500"
            onClick={resetCharacter}
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
}
