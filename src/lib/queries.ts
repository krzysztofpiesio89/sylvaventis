export const FETCH_ALL_PRODUCTS_QUERY = `
  query MyQuery {
    products(first: 50) {
      nodes {
        databaseId
        name
        onSale
        slug
        image {
          sourceUrl
        }
        ... on SimpleProduct {
          databaseId
          price
          regularPrice
          salePrice
          productCategories {
            nodes {
              name
              slug
            }
          }
        }
        ... on VariableProduct {
          databaseId
          price
          regularPrice
          salePrice
          productCategories {
            nodes {
              name
              slug
            }
          }
        }
      }
    }
  }
`;

export const GET_PRODUCT_BY_SLUG = `
  query GetProductBySlug($slug: ID!) {
    product(id: $slug, idType: SLUG) {
      databaseId
      name
      description
      image {
        sourceUrl
      }
      ... on SimpleProduct {
        price
        regularPrice
        salePrice
      }
      ... on VariableProduct {
        price
        regularPrice
        salePrice
        variations {
          nodes {
            databaseId
            name
            price
            attributes {
              nodes {
                name
                value
              }
            }
          }
        }
      }
    }
  }
`;

export const FETCH_ALL_PRODUCT_SLUGS = `
  query FetchAllProductSlugs {
    products(first: 100) {
      nodes {
        slug
      }
    }
  }
`;