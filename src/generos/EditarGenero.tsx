import { useParams } from "react-router";

export default function EditarGenero() {
  const { id }: any = useParams();

  return (
    <>
      <h3>Editar Género </h3>
      <h4>El Id es {id}</h4>
    </>
  );
}
