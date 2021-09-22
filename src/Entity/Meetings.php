<?php

namespace App\Entity;

use App\Repository\MeetingsRepository;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass=MeetingsRepository::class)
 */
class Meetings
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=100)
     */
    private $Name;

    /**
     * @ORM\Column(type="string", length=100)
     */
    private $DateAndTime;

    /**
     * @ORM\Column(type="text", nullable=true)
     */
    private $Description;

    /**
     * @ORM\Column(type="string", length=50)
     */
    private $Room;

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

    public function getDateAndTime(): ?string
    {
        return $this->DateAndTime;
    }

    public function setDateAndTime(string $DateAndTime): self
    {
        $this->DateAndTime = $DateAndTime;

        return $this;
    }

    public function getDescription(): ?string
    {
        return $this->Description;
    }

    public function setDescription(?string $Description): self
    {
        $this->Description = $Description;

        return $this;
    }

    public function getRoom(): ?string
    {
        return $this->Room;
    }

    public function setRoom(string $Room): self
    {
        $this->Room = $Room;

        return $this;
    }
}
