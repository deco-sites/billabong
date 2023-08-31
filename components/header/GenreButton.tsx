import Button from "$store/components/ui/Button.tsx";

export default function GenreButton() {
  return (
    <div>
      <a href="/masculino">
        <Button>
          Masculino
        </Button>  
      </a>
      <a href="/feminino">
        <Button>
          Feminino
        </Button>
      </a>
    </div>
  );
}
