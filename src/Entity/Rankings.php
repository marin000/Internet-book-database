<?php

namespace App\Entity;

use App\Repository\RankingsRepository;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass=RankingsRepository::class)
 */
class Rankings
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
     * @ORM\Column(type="integer")
     */
    private $TriviaId;

    /**
     * @ORM\Column(type="integer", nullable=true)
     */
    private $Points;

    /**
     * @ORM\Column(type="string", length=50)
     */
    private $FirstName;

    /**
     * @ORM\Column(type="string", length=50)
     */
    private $LastName;

    /**
     * @ORM\Column(type="string", length=50)
     */
    private $Country;

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

    public function getTriviaId(): ?int
    {
        return $this->TriviaId;
    }

    public function setTriviaId(int $TriviaId): self
    {
        $this->TriviaId = $TriviaId;

        return $this;
    }

    public function getPoints(): ?int
    {
        return $this->Points;
    }

    public function setPoints(?int $Points): self
    {
        $this->Points = $Points;

        return $this;
    }

    public function getFirstName(): ?string
    {
        return $this->FirstName;
    }

    public function setFirstName(string $FirstName): self
    {
        $this->FirstName = $FirstName;

        return $this;
    }

    public function getLastName(): ?string
    {
        return $this->LastName;
    }

    public function setLastName(string $LastName): self
    {
        $this->LastName = $LastName;

        return $this;
    }

    public function getCountry(): ?string
    {
        return $this->Country;
    }

    public function setCountry(string $Country): self
    {
        $this->Country = $Country;

        return $this;
    }
}
