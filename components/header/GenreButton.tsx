import Button from "$store/components/ui/Button.tsx";

export default function GenreButton() {
  return (
    <div>
      <a href="/masculino">
        <Button class="bg-[#f8f8f8] border-none">
          Masculino
        </Button>
      </a>
      <a href="/feminino">
        <Button class="bg-[#FFF] border-none">
          Feminino
        </Button>
      </a>
    </div>
  );
}
