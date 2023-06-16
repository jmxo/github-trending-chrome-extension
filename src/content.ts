// Get the repo language elements from the page
let languageElements = Array.from(
  document.querySelectorAll('span[itemprop="programmingLanguage"]')
);

// Initialize an empty object to store language counts and colors
let languageData: { [key: string]: { count: number; color: string } } = {};

// Iterate over each language element
languageElements.forEach((languageElement) => {
  if (languageElement.textContent && languageElement.previousElementSibling) {
    let language = languageElement.textContent.trim(); // Get language name
    let colorElement = languageElement.previousElementSibling as HTMLElement; // Get the sibling element which contains color

    // The style property always exists, but backgroundColor can be an empty string if it's not set
    let color = colorElement.style.backgroundColor; // Get color value

    // If this language is already in the object, increment the count
    if (language in languageData) {
      languageData[language].count += 1;
    } else {
      // If this language is not in the object, add it with a count of 1 and the color
      languageData[language] = {
        count: 1,
        color: color,
      };
    }
  }
});

// Create a div to hold the results
let resultDiv = document.createElement("div");
resultDiv.style.cssText = `
    text-align: center;
    background-color: #f6f8fa;
    border: 1px solid #e1e4e8;
    border-radius: 6px;
    padding: 16px;
    margin-bottom: 16px;
    font-size: 14px;
    color: #24292e;
  `;

// Sort languageData by count
let sortedLanguageData = Object.entries(languageData).sort(
  (a, b) => b[1].count - a[1].count
);

// Iterate over each language in the sorted array
sortedLanguageData.forEach(([language, data]) => {
  // Create a new span for each language
  let languageSpan = document.createElement("span");
  languageSpan.style.cssText = `
        display: inline-flex;
        align-items: center;
        margin: 0 6px;
        padding: 5px;
        background-color: #f6f8fa;
        border-radius: 6px;
      `;

  // Create a color span
  let colorSpan = document.createElement("span");
  colorSpan.style.cssText = `
        background-color: ${data.color};
        display: inline-block;
        width: 12px;
        height: 12px;
        border-radius: 50%;
        margin-right: 5px;
      `;

  // Add the color span to the language span
  languageSpan.appendChild(colorSpan);

  // Add the language name and count to the language span
  languageSpan.append(`${language}: ${data.count}`);

  // Add the language span to the result div
  resultDiv.appendChild(languageSpan);
});

// Insert the result div just before the div with 'data-hpc' attribute
let targetDiv = document.querySelector("div[data-hpc]");
if (targetDiv && targetDiv.parentNode) {
  targetDiv.parentNode.insertBefore(resultDiv, targetDiv);
}
