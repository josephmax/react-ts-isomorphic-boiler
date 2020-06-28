import React, { useEffect } from "react";
import axios, { AxiosResponse } from "axios";
import { Store } from "redux";
import { connect, MapDispatchToPropsNonObject } from "react-redux";
import { IChara } from "../store/index.interface";

interface IFetchInitStateFC<T> extends React.FC<T> {
  getInitState(store: Store): Promise<AxiosResponse<any>>;
}

const Main: IFetchInitStateFC<{
  data: IChara[];
  changeData(data: IChara[]): void;
}> = (props) => {
  useEffect(() => {
    if (!props.data || !props.data.length) {
      axios.post("/fetch").then((res) => {
        props.changeData(res.data.data);
      });
    }
    return () => {
      props.changeData([]);
    };
  }, []);
  return (
    <div>
      {
        <ul>
          {props.data.map((chara, i) => (
            <li key={i}>{chara.name}</li>
          ))}
        </ul>
      }
    </div>
  );
};

Main.getInitState = async (store: Store) => {
  return await axios.post("http://localhost:3000/fetch").then((res) => {
    store.dispatch({
      type: "CHANGE_DATA",
      payload: {
        data: res.data.data,
      },
    });
    return res;
  });
};

function mapStateToProps(state: {
  data: Array<{ name: string; age: string }>;
}) {
  return {
    data: state.data,
  };
}

function mapDispatchToProps(dispatch: any) {
  return {
    changeData(data: IChara[]) {
      dispatch({
        type: "CHANGE_DATA",
        payload: { data },
      });
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);
