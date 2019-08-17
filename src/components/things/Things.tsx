import { Button } from "antd";
import * as React from "react";
import { Link, Route } from "react-router-dom";
import { connect, useLoadingEffect } from "../../lib";
import { Placeholder, Spinner } from "../../lib/components/Spinner";
import { State } from "../../state";
import { thingapi } from "../../thing";

type Props = State & {
  match: any
}

const $Things = (props:Props) => {

  const things = thingapi(props);
  const ready = things.all() !== undefined;

  useLoadingEffect({
        unless: ready ,
        task: ()=>things.fetch(),
        error:"Cannot fetch the list of things."
  })

  return <> 
          <Spinner showOn={!ready}  placeholder={Placeholder.list} >
              <Route exact path={props.match.url} render={()=><AllThings {...props}  />} />
          </Spinner>
          <Route exact path={props.match.url+"/:id"} render={ (props) => <span>Showing {props.match.params.id}</span> } />
        </>;
};

export const Things = connect( $Things, state => state.things );


const AllThings = (props:Props) => {


  const things = thingapi(props);

      return <div>
              <br/>
             <Button onClick={ things.addRandom }>Add a thing</Button>
              <br/><br/>
              {
                things.all().length === 0 ? "No-thing." : things.all().map( (t,i) => 
                  
                  <Link key={i} to={props.match.url+"/"+t.name } >
                      <div >{t.name}</div>
                  </Link>
                )}
            </div>;
}