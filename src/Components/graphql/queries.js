import gql from "graphql-tag";

export default {
  addCity: gql`
    mutation createCity($name: String!, $image: String, $latitude: numeric, $longitude: numeric) {
      insert_cities(objects: { name: $name, image: $image, latitude: $latitude, longitude: $longitude }) {
        affected_rows
        returning {
          id
          name
          image
          latitude
          longitude
        }
      }
    }
  `,

  removeCity: gql`
    mutation removeCity($id: Int!) {
      delete_cities(where: { id: {_eq: $id}}) {
        affected_rows
      }
    }
  `,

  getPartners: gql`
    query getPartners {
      partners {
        id
        name
        city
        country
      }
    }
  `,
  getCities: gql`
    query getCities {
      cities {
        id
        name
        image
        latitude
        longitude
      }
    }
  `
};
