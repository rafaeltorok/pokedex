import React from "react";

export default function ErrorMessage({ error }) {
  return <div data-testid="error">An error occured: {error.toString()}</div>;
}
