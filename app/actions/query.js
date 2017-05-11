
export function updateQuery(query) {
  console.log('im in action');
  return {
      type: "UPDATE_QUERY",
      query: query,
    }
}
