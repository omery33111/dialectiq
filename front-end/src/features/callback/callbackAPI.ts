import axios from "axios";
import { Callback } from "../../models/Callback";
import { callbackURL } from "../../endpoints/endpoints";



  export function postCallback(callbackData: Callback)
{
  return new Promise<{ data: Callback }>((resolve) =>
    axios.post(`${callbackURL}/post_callback/`, callbackData).then((res) => resolve({ data: res.data })));
}