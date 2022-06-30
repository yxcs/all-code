import Loadable from "react-loadable";
import Loading from "common/loading";

export const Home = Loadable({
    loader:_=>import("./home"),
    loading:Loading
})

export const Classfiy = Loadable({
    loader:_=>import("./classfiy"),
    loading:Loading
})

export const Cart = Loadable({
    loader:_=>import("./cart"),
    loading:Loading
})

export const Mine = Loadable({
    loader:_=>import("./mine"),
    loading:Loading
})

export const Login = Loadable({
    loader:_=>import("./login"),
    loading:Loading
})

