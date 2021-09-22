<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20210517221045 extends AbstractMigration
{
    public function getDescription() : string
    {
        return '';
    }

    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE new_books DROP FOREIGN KEY FK_B28D694F16A2B381');
        $this->addSql('DROP INDEX UNIQ_B28D694F16A2B381 ON new_books');
        $this->addSql('ALTER TABLE new_books ADD name VARCHAR(80) NOT NULL, ADD author VARCHAR(60) NOT NULL, ADD image VARCHAR(255) NOT NULL, DROP book_id');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE new_books ADD book_id INT NOT NULL, DROP name, DROP author, DROP image');
        $this->addSql('ALTER TABLE new_books ADD CONSTRAINT FK_B28D694F16A2B381 FOREIGN KEY (book_id) REFERENCES book (id)');
        $this->addSql('CREATE UNIQUE INDEX UNIQ_B28D694F16A2B381 ON new_books (book_id)');
    }
}
