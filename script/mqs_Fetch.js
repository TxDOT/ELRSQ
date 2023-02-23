
// calls API
async function queryService(url) {

  GreenToYellow();

  const response = await fetch(url, {
    method: 'GET',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json'
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer'
  });

  YellowToGreen();

  return response.json(); // parses JSON response into native JavaScript objects
}


async function queryRoadwayService(url) {

  GreenToYellow();

  const response = await fetch(url, {
    method: 'GET',
  });

  YellowToGreen();
  
  return response.json(); // parses JSON response into native JavaScript objects
}