function filterMultipleReturns(convertSessionParams, unfilteredArr) {
  if (GLOBALSETTINGS.PrintIterations == 1) { console.log(unfilteredArr); }
  let matchError = 0;
  let results0 = unfilteredArr[0];
  if (results0[0].RTE_DEFN_LN_NM == null) { matchError = -1; };

  let rteid_Arr = _.map(results0, _.property('ROUTEID'));
  let rdbd_Arr = _.map(results0, _.property('RTE_PRFX_TYPE_DSCR')); //FIXME switch to correct fieldname
  let kg_Arr = rdbd_Arr.map(x => (x == 'Single Roadbed'));

  let rteid_rdbd_match_Arr = _.zip(rteid_Arr, rdbd_Arr, kg_Arr);

  let justKGs_Arr = [];
  for (let i = 0; i < rteid_rdbd_match_Arr.length; i = i + 1) {
    if (rteid_rdbd_match_Arr[i][2]) {
      justKGs_Arr.push(rteid_rdbd_match_Arr[i][0]);
    }
  }

  const { ROUTEIDs, RTE_PRFX_TYPE_DSCRs } = { ROUTEIDs: justKGs_Arr, RTE_PRFX_TYPE_DSCRs: ['Single Roadbed'] };

  const filteredresults0 = results0.filter(({ ROUTEID, RTE_PRFX_TYPE_DSCR }) => (
    !(ROUTEIDs.includes(ROUTEID)) || RTE_PRFX_TYPE_DSCRs.includes(RTE_PRFX_TYPE_DSCR)
  ));


  let matchObj = {};
  matchObj.filteredresults = filteredresults0;
  matchObj.matcherror = matchError;

  console.log(matchObj);
  return (matchObj);
}
