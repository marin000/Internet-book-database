<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20210511152207 extends AbstractMigration
{
    public function getDescription() : string
    {
        return '';
    }

    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE all_time_books DROP FOREIGN KEY FK_7EDDDFCEF675F31B');
        $this->addSql('DROP INDEX UNIQ_7EDDDFCEF675F31B ON all_time_books');
        $this->addSql('ALTER TABLE all_time_books DROP author_id');
        $this->addSql('ALTER TABLE best_sellers DROP FOREIGN KEY FK_909AF73BF675F31B');
        $this->addSql('DROP INDEX UNIQ_909AF73BF675F31B ON best_sellers');
        $this->addSql('ALTER TABLE best_sellers DROP author_id');
        $this->addSql('ALTER TABLE new_books DROP FOREIGN KEY FK_B28D694FF675F31B');
        $this->addSql('DROP INDEX UNIQ_B28D694FF675F31B ON new_books');
        $this->addSql('ALTER TABLE new_books DROP author_id');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE all_time_books ADD author_id INT NOT NULL');
        $this->addSql('ALTER TABLE all_time_books ADD CONSTRAINT FK_7EDDDFCEF675F31B FOREIGN KEY (author_id) REFERENCES author (id)');
        $this->addSql('CREATE UNIQUE INDEX UNIQ_7EDDDFCEF675F31B ON all_time_books (author_id)');
        $this->addSql('ALTER TABLE best_sellers ADD author_id INT NOT NULL');
        $this->addSql('ALTER TABLE best_sellers ADD CONSTRAINT FK_909AF73BF675F31B FOREIGN KEY (author_id) REFERENCES author (id)');
        $this->addSql('CREATE UNIQUE INDEX UNIQ_909AF73BF675F31B ON best_sellers (author_id)');
        $this->addSql('ALTER TABLE new_books ADD author_id INT NOT NULL');
        $this->addSql('ALTER TABLE new_books ADD CONSTRAINT FK_B28D694FF675F31B FOREIGN KEY (author_id) REFERENCES author (id)');
        $this->addSql('CREATE UNIQUE INDEX UNIQ_B28D694FF675F31B ON new_books (author_id)');
    }
}
