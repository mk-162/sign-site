import { client } from '..';
import { graphql } from '../graphql';
import { revalidate } from '../revalidate-target';

const getCategoryTreeQuery = graphql(`
  query getCategoryTree {
    site {
      categoryTree {
        entityId
        name
        path
        children {
          entityId
          name
          path
          children {
            entityId
            name
            path
          }
        }
      }
    }
  }
`);

export const getCategoryTree = async () => {
    const response = await client.fetch({
        document: getCategoryTreeQuery,
        fetchOptions: { next: { revalidate } },
    });

    return response.data.site.categoryTree;
};
