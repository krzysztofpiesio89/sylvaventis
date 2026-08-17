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
          stockStatus
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
          stockStatus
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
        stockStatus
      }
      ... on VariableProduct {
        price
        regularPrice
        salePrice
        stockStatus
        variations {
          nodes {
            databaseId
            name
            price
            stockStatus
            attributes {
              nodes {
                name
                value
              }
            }
          }
        }
      }
      related(first: 3) {
        nodes {
          databaseId
          name
          slug
          onSale
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

export const FETCH_ALL_CATEGORIES_QUERY = `
  query FetchAllCategories {
    productCategories(first: 100) {
      nodes {
        id
        databaseId
        name
        slug
        count
        image {
          sourceUrl
        }
      }
    }
  }
`;

export const GET_PRODUCTS_BY_CATEGORY_SLUG = `
  query ProductsByCategorySlug($slug: ID!) {
    productCategory(id: $slug, idType: SLUG) {
      id
      databaseId
      name
      slug
      description
      image {
        sourceUrl
      }
      children(first: 50) {
        nodes {
          id
          databaseId
          name
          slug
          count
          image {
            sourceUrl
          }
        }
      }
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
            price
            regularPrice
            salePrice
            stockStatus
          }
          ... on VariableProduct {
            price
            regularPrice
            salePrice
            stockStatus
          }
        }
      }
    }
  }
`;

export const GET_VIEWER_QUERY = `
  query GetViewer {
    viewer {
      id
      databaseId
      name
      email
      firstName
      lastName
      username
      orders {
        nodes {
          id
          databaseId
          orderNumber
          date
          status
          total
          lineItems {
            nodes {
              product {
                node {
                  name
                  image {
                    sourceUrl
                  }
                }
              }
              quantity
              total
            }
          }
        }
      }
    }
  }
`;