<?php

namespace App\Entity;

use App\Repository\LibraryRepository;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass=LibraryRepository::class)
 */
class Library
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="integer")
     */
    private $UserId;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $BookId;

    /**
     * @ORM\Column(type="boolean", nullable=true)
     */
    private $Favorite;

    /**
     * @ORM\Column(type="integer", nullable=true)
     */
    private $Rating;

    /**
     * @ORM\Column(type="text", nullable=true)
     */
    private $Review;

    /**
     * @ORM\Column(type="boolean", nullable=true)
     */
    private $JustReading;

    /**
     * @ORM\Column(type="boolean", nullable=true)
     */
    private $ForReading;

    /**
     * @ORM\Column(type="boolean", nullable=true)
     */
    private $AlreadyRead;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $Title;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $Author;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $Image;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getUserId(): ?int
    {
        return $this->UserId;
    }

    public function setUserId(int $UserId): self
    {
        $this->UserId = $UserId;

        return $this;
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

    public function getFavorite(): ?bool
    {
        return $this->Favorite;
    }

    public function setFavorite(?bool $Favorite): self
    {
        $this->Favorite = $Favorite;

        return $this;
    }

    public function getRating(): ?int
    {
        return $this->Rating;
    }

    public function setRating(?int $Rating): self
    {
        $this->Rating = $Rating;

        return $this;
    }

    public function getReview(): ?string
    {
        return $this->Review;
    }

    public function setReview(?string $Review): self
    {
        $this->Review = $Review;

        return $this;
    }

    public function getJustReading(): ?bool
    {
        return $this->JustReading;
    }

    public function setJustReading(?bool $JustReading): self
    {
        $this->JustReading = $JustReading;

        return $this;
    }

    public function getForReading(): ?bool
    {
        return $this->ForReading;
    }

    public function setForReading(?bool $ForReading): self
    {
        $this->ForReading = $ForReading;

        return $this;
    }

    public function getAlreadyRead(): ?bool
    {
        return $this->AlreadyRead;
    }

    public function setAlreadyRead(?bool $AlreadyRead): self
    {
        $this->AlreadyRead = $AlreadyRead;

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

    public function setAuthor(?string $Author): self
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
