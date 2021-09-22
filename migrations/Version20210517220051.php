<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20210517220051 extends AbstractMigration
{
    public function getDescription() : string
    {
        return '';
    }

    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE best_sellers DROP FOREIGN KEY FK_909AF73B16A2B381');
        $this->addSql('DROP INDEX UNIQ_909AF73B16A2B381 ON best_sellers');
        $this->addSql('ALTER TABLE best_sellers ADD name VARCHAR(50) NOT NULL, ADD author VARCHAR(60) NOT NULL, DROP book_id');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE best_sellers ADD book_id INT NOT NULL, DROP name, DROP author');
        $this->addSql('ALTER TABLE best_sellers ADD CONSTRAINT FK_909AF73B16A2B381 FOREIGN KEY (book_id) REFERENCES book (id)');
        $this->addSql('CREATE UNIQUE INDEX UNIQ_909AF73B16A2B381 ON best_sellers (book_id)');
    }
}
