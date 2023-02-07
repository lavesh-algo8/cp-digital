import { Button } from "@mui/material";
import { useState } from "react";

function Check() {
  const [form, setForm] = useState({
    tags: [
      { id: "131", name: "Athletic/Higher caloric", isChecked: true },
      { id: "80", name: "Aggressive Weight Loss", isChecked: false },
      { id: "100", name: "Quick and Easy", isChecked: false },
    ],
  });

  const [idwithcheckedtrue, setidwithcheckedtrue] = useState([]);

  const onCheckedHandler = (index) => {
    setForm((prev) => ({
      ...prev,
      tags: [
        ...prev?.tags?.map(({ isChecked, ...rest }, idx) =>
          idx === index
            ? { ...rest, isChecked: !isChecked }
            : { ...rest, isChecked }
        ),
      ],
    }));
    console.log(form);
  };

  const checkonClick = () => {
    console.log(
      form?.tags?.reduce((values, value) => {
        console.log(value);
        if (value) values.push({ id: value.id, isChecked: value.isChecked });
        return values;
      }, [])
    );
  };

  return (
    <div>
      {form?.tags?.map((tag, i) => (
        <div>
          <label>{tag.name}</label>
          <input
            type="checkbox"
            checked={tag.isChecked}
            onChange={(event) => onCheckedHandler(i)}
            key={i}
          />
        </div>
      ))}

      <Button onClick={checkonClick}>On Click</Button>
    </div>
  );
}

export default Check;
