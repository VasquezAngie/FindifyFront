import { encryptPassword } from "./EncryptPassword";

interface FormData {
  nombres: string;
  apellidos: string;
  email: string;
  cc: string;
  celular: string;
  direccion: string;
  password: string;
}

export const RegisterHandleSubmit = async (
  e: React.FormEvent<HTMLFormElement>,
  formData: FormData,
  setIsSuccess: React.Dispatch<React.SetStateAction<boolean>>
) => {
  e.preventDefault();

  const hashedPassword = encryptPassword(formData.password);
  const dataToSend = { ...formData, password: hashedPassword };

  try {
    const response = await fetch("URL API DE YEYE", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataToSend),
    });

    if (response.ok) {
      setIsSuccess(true);
    } else {
      console.error("Error al registrar.");
    }
  } catch (error) {
    console.error("Error en la solicitud:", error);
  }
};
