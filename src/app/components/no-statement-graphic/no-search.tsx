// import { Button } from "../ui/button";

export const NoResult = () => {
  return (
    <div className="text-center flex flex-col items-center bg-gray-100 rounded-lg p-6">
        <img src="/no-statement.svg" alt="" />
              <h2 className="text-2xl font-semibold mb-4">Unable to analyse statement.</h2>
              <p className="mb-6">
              We couldn't find any information related to your statement. Try typing something else.
              </p>
              {/* <Button
                className="bg-blue-500 hover:bg-blue-600 text-white"
                onClick={() => {
                  // Reset the state and redirect to the search page
                  setTimedOut(false);
                  setLoading(true);
                  // Implement your navigation logic here, e.g., using react-router
                  navigate("/");
                }}
              >
                Make Another Search
              </Button> */}
            </div>
  )
}
