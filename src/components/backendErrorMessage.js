const BackendErrorMessages = ({ backendErrors }) => {
  const errorMessages = Object.keys(backendErrors).map((key) => {
    const messages = backendErrors[key].join(' ');
    return `${key}: ${messages}`;
  });
  return (
    <ul className="error-messages">
      {errorMessages.map((message) => (
        <li key={message}>{message}</li>
      ))}
    </ul>
  );
};

export { BackendErrorMessages };
