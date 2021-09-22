<?php

namespace App\Entity;

use App\Repository\TriviaRepository;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass=TriviaRepository::class)
 */
class Trivia
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=50)
     */
    private $Name;

    /**
     * @ORM\Column(type="boolean")
     */
    private $Published;

    /**
     * @ORM\Column(type="array")
     */
    private $Questions = [];

    /**
     * @ORM\Column(type="array")
     */
    private $Answer1 = [];

    /**
     * @ORM\Column(type="array")
     */
    private $Answer2 = [];

    /**
     * @ORM\Column(type="array")
     */
    private $Answer3 = [];

    /**
     * @ORM\Column(type="array")
     */
    private $Answer4 = [];

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $Answer5;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $Answer6;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $Answer7;

    /**
     * @ORM\Column(type="string", length=30, nullable=true)
     */
    private $DateOfCreation;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getName(): ?string
    {
        return $this->Name;
    }

    public function setName(string $Name): self
    {
        $this->Name = $Name;

        return $this;
    }

    public function getPublished(): ?bool
    {
        return $this->Published;
    }

    public function setPublished(bool $Published): self
    {
        $this->Published = $Published;

        return $this;
    }

    public function getQuestions(): ?array
    {
        return $this->Questions;
    }

    public function setQuestions(array $Questions): self
    {
        $this->Questions = $Questions;

        return $this;
    }

    public function getAnswer1(): ?array
    {
        return $this->Answer1;
    }

    public function setAnswer1(array $Answer1): self
    {
        $this->Answer1 = $Answer1;

        return $this;
    }

    public function getAnswer2(): ?array
    {
        return $this->Answer2;
    }

    public function setAnswer2(array $Answer2): self
    {
        $this->Answer2 = $Answer2;

        return $this;
    }

    public function getAnswer3(): ?array
    {
        return $this->Answer3;
    }

    public function setAnswer3(array $Answer3): self
    {
        $this->Answer3 = $Answer3;

        return $this;
    }

    public function getAnswer4(): ?array
    {
        return $this->Answer4;
    }

    public function setAnswer4(array $Answer4): self
    {
        $this->Answer4 = $Answer4;

        return $this;
    }

    public function getAnswer5(): ?string
    {
        return $this->Answer5;
    }

    public function setAnswer5(string $Answer5): self
    {
        $this->Answer5 = $Answer5;

        return $this;
    }

    public function getAnswer6(): ?string
    {
        return $this->Answer6;
    }

    public function setAnswer6(string $Answer6): self
    {
        $this->Answer6 = $Answer6;

        return $this;
    }

    public function getAnswer7(): ?string
    {
        return $this->Answer7;
    }

    public function setAnswer7(string $Answer7): self
    {
        $this->Answer7 = $Answer7;

        return $this;
    }

    public function getDateOfCreation(): ?string
    {
        return $this->DateOfCreation;
    }

    public function setDateOfCreation(string $DateOfCreation): self
    {
        $this->DateOfCreation = $DateOfCreation;

        return $this;
    }

}
