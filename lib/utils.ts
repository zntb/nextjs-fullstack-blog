function changeLanguageCharacters(text: string): string {
  const characterMap: { [key: string]: string } = {
    á: 'a',
    é: 'e',
    í: 'i',
    ó: 'o',
    ö: 'oe',
    ő: 'oe',
    ú: 'u',
    ü: 'ue',
    ű: 'ue',
  };

  const pattern = new RegExp(Object.keys(characterMap).join('|'), 'g');

  const replacedText = text.replace(pattern, (matched: string) => {
    return characterMap[matched];
  });

  return replacedText;
}

export const slugify = (str: string) =>
  changeLanguageCharacters(str.toLowerCase().replace(/ /g, '-'))
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
