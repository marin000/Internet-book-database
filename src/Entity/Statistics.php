<?php

namespace App\Entity;

use App\Repository\StatisticsRepository;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass=StatisticsRepository::class)
 */
class Statistics
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
    private $BookId;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $Title;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $Author;

    /**
     * @ORM\Column(type="integer", nullable=true)
     */
    private $LibraryNum;

    /**
     * @ORM\Column(type="integer", nullable=true)
     */
    private $ReviewNum;

    /**
     * @ORM\Column(type="integer", nullable=true)
     */
    private $FavoriteNum;

    /**
     * @ORM\Column(type="integer", nullable=true)
     */
    private $JustReadingNum;

    /**
     * @ORM\Column(type="integer", nullable=true)
     */
    private $ForReadingNum;

    /**
     * @ORM\Column(type="integer", nullable=true)
     */
    private $AlreadyReadNum;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getBookId(): ?string
    {
        return $this->BookId;
    }

    public function setBookId(string $BookId): self
    {
        $this->BookId = $BookId;

        return $this;
    }

    public function getTitle(): ?string
    {
        return $this->Title;
    }

    public function setTitle(string $Title): self
    {
        $this->Title = $Title;

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

    public function getLibraryNum(): ?int
    {
        return $this->LibraryNum;
    }

    public function setLibraryNum(?int $LibraryNum): self
    {
        $this->LibraryNum = $LibraryNum;

        return $this;
    }

    public function getReviewNum(): ?int
    {
        return $this->ReviewNum;
    }

    public function setReviewNum(?int $ReviewNum): self
    {
        $this->ReviewNum = $ReviewNum;

        return $this;
    }

    public function getFavoriteNum(): ?int
    {
        return $this->FavoriteNum;
    }

    public function setFavoriteNum(?int $FavoriteNum): self
    {
        $this->FavoriteNum = $FavoriteNum;

        return $this;
    }

    public function getJustReadingNum(): ?int
    {
        return $this->JustReadingNum;
    }

    public function setJustReadingNum(?int $JustReadingNum): self
    {
        $this->JustReadingNum = $JustReadingNum;

        return $this;
    }

    public function getForReadingNum(): ?int
    {
        return $this->ForReadingNum;
    }

    public function setForReadingNum(?int $ForReadingNum): self
    {
        $this->ForReadingNum = $ForReadingNum;

        return $this;
    }

    public function getAlreadyReadNum(): ?int
    {
        return $this->AlreadyReadNum;
    }

    public function setAlreadyReadNum(?int $AlreadyReadNum): self
    {
        $this->AlreadyReadNum = $AlreadyReadNum;

        return $this;
    }
}
