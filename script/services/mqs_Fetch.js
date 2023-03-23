
// calls API

/**
 * 
 * @param {*} url 
 * @returns 
 */
async function queryService(url) {

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

  return response.json(); // parses JSON response into native JavaScript objects
}


/**
 * 
 * @param {*} url 
 * @returns 
 */
async function queryRoadwayService(url) {

  const response = await fetch(url, {
    method: 'GET',
  });
  
  return response.json(); // parses JSON response into native JavaScript objects
}