import { useState } from "react";
import { observer } from "mobx-react-lite";
import useStore from "@/app/providers/StoreProvider/config/useStore";
// import { useNavigate } from "react-router-dom";
// import { getHomePage } from "@/shared/consts/router";

export const RegistrationForm = observer(() => {
  const { user } = useStore();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  // const navigate = useNavigate();

  return (
    <div>
      <div className="rounded-md shadow-sm -space-y-px mb-2">
        <label htmlFor="email-address" className="sr-only">
          Email address
        </label>
        <input
          id="email-address"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          type="text"
          placeholder="Email"
          className="appearance-none rounded-none relative block
          w-full px-3 py-2 border border-gray-300
          placeholder-gray-500 text-gray-900 rounded-b-md
          focus:outline-none focus:ring-indigo-500
          focus:border-indigo-500 focus:z-10 sm:text-sm"
        />
      </div>

      <div className="mb-2">
        <label htmlFor="password" className="sr-only">
          Password
        </label>
        <input
          id="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          type="password"
          name="password"
          placeholder="Password"
          className="appearance-none rounded-none relative block
            w-full px-3 py-2 border border-gray-300
            placeholder-gray-500 text-gray-900 rounded-b-md
            focus:outline-none focus:ring-indigo-500
            focus:border-indigo-500 focus:z-10 sm:text-sm"
        />
      </div>

      <button onClick={() => user?.registration(email, password)}>
        Регистрация
      </button>
    </div>
  );
});
