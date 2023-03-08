import './App.css';
// Import everything needed to use the `useQuery` hook
import { useQuery, gql } from '@apollo/client';

const GET_ALL_POSTS = gql`
  query GetAllPosts {
    getAllPosts {
      id
      title
      description
    }
  }
`;

function DisplayAllPosts() {
  const { loading, error, data } = useQuery(GET_ALL_POSTS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  return data.getAllPosts.map(({ id, title, description }) => (
    <div key={id}>
      <h3>Title: {title}</h3>
      {/* <img width='400' height='250' alt='location-reference' src={``} /> */}
      <br />
      <b>Description:</b>
      <span>{description}</span>
      <br />
    </div>
  ));
}

export default function App() {
  return (
    <div>
      <h2>My first Apollo app 🚀</h2>
      <DisplayAllPosts></DisplayAllPosts>
    </div>
  );
}
