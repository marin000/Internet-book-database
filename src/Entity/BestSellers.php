<?php

namespace App\Entity;

use App\Repository\BestSellersRepository;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass=BestSellersRepository::class)
 */
class BestSellers
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
     * @ORM\Column(type="string", length=60)
     */
    private $Author;

    /**
     * @ORM\Column(type="string", length=50)
     */
    private $Sales;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $Image;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getSales(): ?string
    {
        return $this->Sales;
    }

    public function setSales(string $Sales): self
    {
        $this->Sales = $Sales;

        return $this;
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

    public function getAuthor(): ?string
    {
        return $this->Author;
    }

    public function setAuthor(string $Author): self
    {
        $this->Author = $Author;

        return $this;
    }

    public function getImage(): ?string
    {
        return $this->Image;
    }

    public function setImage(string $Image): self
    {
        $this->Image = $Image;

        return $this;
    }

}
