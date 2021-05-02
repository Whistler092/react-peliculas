import Button from "./Button";
import './SelectorMultiple.css';

export default function SelectorMultiple(props: selectorMultipleProps) {
  function selecctionar(item: selectorMultipleModel) {
    const seleccionados = [...props.seleccionados, item];
    const noSeleccionados = props.noSeleccionados.filter(
      (valor) => valor !== item
    );
    props.onChange(seleccionados, noSeleccionados);
  }

  function deseleccionar(item: selectorMultipleModel) {
    const seleccionados = props.seleccionados.filter((valor) => valor !== item);
    const noSeleccionados = [...props.noSeleccionados, item];
    props.onChange(seleccionados, noSeleccionados);
  }

  function seleccionarTodo() {
    const seleccionados = [...props.seleccionados, ...props.noSeleccionados];
    const noSeleccionados: selectorMultipleModel[] = [];
    props.onChange(seleccionados, noSeleccionados);
  }

  function deseleccionarTodo() {
    const noSeleccionados = [...props.seleccionados, ...props.noSeleccionados];
    const seleccionados: selectorMultipleModel[] = [];
    props.onChange(seleccionados, noSeleccionados);
  }

  return (
    <div className="selector-multiple">
      <ul>
        {props.noSeleccionados.map((item) => (
          <li key={item.llave} onClick={() => selecctionar(item)}>
            {item.valor}
          </li>
        ))}
      </ul>
      <div className="selector-multiple-botones">
        <Button type="button" onClick={seleccionarTodo}>
          {">>"}
        </Button>
        <Button type="button" onClick={deseleccionarTodo}>
          {"<<"}
        </Button>
      </div>
      <ul>
        {props.seleccionados.map((item) => (
          <li key={item.llave} onClick={() => deseleccionar(item)}>
            {item.valor}
          </li>
        ))}
      </ul>
    </div>
  );
}

export interface selectorMultipleProps {
  seleccionados: selectorMultipleModel[];
  noSeleccionados: selectorMultipleModel[];
  onChange(
    seleccionados: selectorMultipleModel[],
    noSeleccionados: selectorMultipleModel[]
  ): void;
}

export interface selectorMultipleModel {
  llave: number;
  valor: string;
}
