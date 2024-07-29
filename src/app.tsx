export function App(props: any) {
  const array = [
    [1, 2, 3, 4],
    [5, 6],
  ];

  async function name() {
    const result = await Promise.resolve(5);

    return result;
  }

  name().then((res) => console.log(res));

  console.log(array.flat());

  return (
    <div>
      React App <br />
      {array.flat().join(" ")}
    </div>
  );
}
