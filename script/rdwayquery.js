async function rdwayQuery(url) {
    const results = await rdwayQueryService(url);
    console.log(results);
  }

  // calls API
  async function rdwayQueryService(url) {  
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
    
    return response.json();
  }
  
  