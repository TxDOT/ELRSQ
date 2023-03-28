function overload() {

  let overloadArr = [
    {
      routeName: "US0077-KG",
      dfo: 138
},
    {
      routeName: "US0077-KG",
      dfo: 140
},
    {
      routeName: "US0077-KG",
      dfo: 142
},
    {
      routeName: "US0077-KG",
      dfo: 144
},
    {
      routeName: "US0077-KG",
      dfo: 146
},
    {
      routeName: "US0077-KG",
      dfo: 148
},
    {
      routeName: "US0077-KG",
      dfo: 150
},
    {
      routeName: "US0077-KG",
      dfo: 152
},
    {
      routeName: "US0077-KG",
      dfo: 154
},
    {
      routeName: "US0077-KG",
      dfo: 156
},
    {
      routeName: "US0077-KG",
      dfo: 158
},
    {
      routeName: "US0077-KG",
      dfo: 160
}
  ]




  for (let i = 0; i < overloadArr.length; i = i + 1) {
    routeName = overloadArr[i].routeName;
    dfo = overloadArr[i].dfo;
    url = `https://lrs-ext.us-e1.cloudhub.io/api/elrs4?RouteID=${routeName}&DistanceFromOrigin=${dfo}`;
    queryService(url);
  }



}