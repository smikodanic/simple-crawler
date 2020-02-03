interface ICrawledData {
  _id?: string;

  url: string;
  h1: string;
  h2: string;
  h3: string;
  links: string[];
}

export { ICrawledData };
