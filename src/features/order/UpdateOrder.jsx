import { useActionData, useFetcher } from "react-router-dom";
import Button from "../../ui/Button";
import { updateOrder } from "../../services/apiRestaurant";
import { useState } from "react";
import { useSelector } from "react-redux";

function UpdateOrder({ order, priority }) {
  const fetcher = useFetcher();
  const [isOpen, setIsOpen] = useState(false);
  
  const formErrors = useActionData();
  function handleChangeToggle(e) {
    e.preventDefault();
    setIsOpen(!isOpen);
  }
  return (
    <>
      <fetcher.Form method="PATCH" className="text-right">
        {!priority && <Button type="primary">Make priority</Button>}
      </fetcher.Form>
      <fetcher.Form>
        <Button type="primary" onClick={handleChangeToggle}>
          Change order details
        </Button>
        <div className={`${isOpen ? "" : "hidden"} mt-5 `}>
          <div className="mb-5 mt-5 flex flex-col gap-2 sm:flex-row sm:items-center">
            <label className="sm:basis-40">Phone number</label>
            <div className="grow">
              <input
                type="tel"
                name="phone"
                required
                className="input w-full"
              />
              {formErrors?.phone && (
                <p className="mt-2 rounded-md bg-red-100 p-2 text-xs text-red-700">
                  {formErrors.phone}
                </p>
              )}
            </div>
          </div>

          <div className="relative  mt-5 flex flex-col gap-2 sm:flex-row sm:items-center">
            <label className="sm:basis-40">Address</label>
            <div className="grow">
              <input
                type="text"
                name="address"
                required
                className="input w-full"
              />
            </div>
          </div>
        </div>
      </fetcher.Form>
    </>
  );
}

export default UpdateOrder;

export async function action({ request, params }) {
  const data = { priority: true };
  await updateOrder(params.orderId, data);
  return null;
}
