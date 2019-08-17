import MockAdapter from "axios-mock-adapter";
import { random } from "./lib/utils";




export const mockery= (mock:MockAdapter) => {
  
  mock.onGet("config.json").reply(200,{
    mode: "dev",
    services: {
      self:{"prefix":""},
      sampleservice:{"prefix":"ms",default:true}
    },
    intl:{ 
      languages:["en","fr"]
    },
    someprop: "someval"
  })
  
  //mock.onGet("/ms/logged").replyOnce(500,{reason:"unknown path"});
  mock.onGet("/ms/logged").reply(200,{username:random("mock")})

  mock.onGet("/ms/thing").reply(200,[{name:random("fetched-thing")}])

  mock.onAny().passThrough()

}