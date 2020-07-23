import NextHead from 'next/head';

const defaultTitle = 'Github Profile';
const defaultDesc = 'Visualize your github profile';

const Head = (props) => (
  <NextHead>
    <meta charSet="UTF-8" />
    <title>{props.title || defaultTitle}</title>
    <meta name="description" content={props.description || defaultDesc} />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link rel="icon" href="/static/favicons/favicon.ico" />
  </NextHead>
);

export default Head;