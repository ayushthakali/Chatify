import { LoaderIcon } from "lucide-react";

function PageLoader() {
  return (
    <div className="flex h-screen justify-center items-center">
      <LoaderIcon className="size-10 animate-spin" />
    </div>
  );
}

export default PageLoader;
