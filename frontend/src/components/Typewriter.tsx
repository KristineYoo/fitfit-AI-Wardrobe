//Made by Iain Gore 5/2/25
//Most recent mod: Iain Gore 5/4/25

import React, { useState, useEffect } from 'react';

interface TypewriterProps {
  texts: string[];
  speed?: number; // Milliseconds per character, default to 50ms
}

const Typewriter: React.FC<TypewriterProps> = ({ texts, speed}) => {
  const [displayedText, setDisplayedText] = useState('');
  const [index, setIndex] = useState(0);
  const [deleting, setdeleting] = useState(false);
  const [textIndex, setTextIndex] = useState(1)
  const [text, setText] = useState(texts[0])

  useEffect(() => {
      const timer = setTimeout(() => {
        setDisplayedText(text.substring(0, index+1));
        if (deleting==false) {
            setIndex(index+1);
            if (index==text.length) {
                setdeleting(true)
            }
        }
        if (deleting==true){
            setIndex(index-1)
            if (index==0) {
                setdeleting(false)
                if (textIndex==texts.length) {
                    setTextIndex(0)
                    setText(texts[0])
                }
                else {
                    setTextIndex(textIndex+1)
                    setText(texts[textIndex])
                }

            }
        }
      }, speed);
      return () => clearTimeout(timer); // Clean up timer if component unmounts or text changes

  }, [text, index, speed]);

  return <span>{displayedText}</span>;
};

export default Typewriter;