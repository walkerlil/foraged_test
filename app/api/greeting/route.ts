type FormattedText = {
    text: string;
    count: number; 
    highlight: [number, number];
  };
  
  export async function POST(request: Request) {
    const body = await request.json();
    // helps to remove all non-alphabetic characters and convert the input text to uppercase
    const inputText = body.input.toUpperCase().replace(/[^A-Z ]/g, '');
    // transforms the text string into an array of characters
    const textArray = inputText.split('');
  
    let longestStreakLength = 0;
    let longestStreakStart = -1;
    let currentStreakLength = 0;
    let currentStreakStart = -1;
    let isEven = true; // starts with 'A', which is considered even
  
    // this loops through each character in the input text
    for (let i = 0; i < textArray.length; i++) {
      const char = textArray[i];
      const charCode = char.charCodeAt(0);
  
      // check if the character is a space or punctuation
      if (char === ' ' || (charCode < 65 || charCode > 90)) {
        // If we encounter punctuation or white space, we can't continue the current streak.
        // instead, we need to start a new streak from the next character.
        currentStreakLength = 0;
        currentStreakStart = -1;
        isEven = charCode % 2 === 0; // Reset the even/odd flag based on the next character.
        continue;
      }
  
      // check to see if the character's position in the alphabet is even or odd
      if ((isEven && charCode % 2 === 0) || (!isEven && charCode % 2 !== 0)) {
        // continues the current streak
        currentStreakLength++;
  
        if (currentStreakLength > longestStreakLength) {
          // updates the longest streak information
          longestStreakLength = currentStreakLength;
          longestStreakStart = currentStreakStart;
        }
      } else {
        // starts a new streak
        currentStreakLength = 1;
        currentStreakStart = i;
        isEven = !isEven; // Toggle even/odd for the next streak
      }
    }
  
    // Handle the case when no streak is found
    if (longestStreakLength === 0) {
      longestStreakStart = -1;
    }
  
    const response: FormattedText = {
      text: body.input,
      count: longestStreakLength,
      highlight: [longestStreakStart, longestStreakStart + longestStreakLength - 1], // Corrected the end index
    };
  
    return new Response(JSON.stringify(response));
  }
  