const allThings = [
  { "name": "thing 1" },
  { "name": "thing 2" },
  { "name": "thing 3" },
  { "name": "thing 4" },
  { "name": "thing 5" },
];

const PAGE_SIZE = 3;

export default defineEventHandler((event) => {
  const auth = getRequestHeader(event, "Authorization");
  const page = getQuery(event).page || 0;  
  console.log("server/api/things", { auth, page });

  return {
    "things": allThings.slice(parseInt(page) * PAGE_SIZE, parseInt(page + 1) * PAGE_SIZE)
  }
})
