import { makeQuestion } from 'test/factories/make-question'
import { EditQuestionUseCase } from './edit-question'
import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { NotAllowedError } from './errors/not-allowed-error'

describe('[EditQuestionUseCase]', () => {
  let inMemoryQuestionsRepository: InMemoryQuestionsRepository
  let sut: EditQuestionUseCase

  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository()

    sut = new EditQuestionUseCase(inMemoryQuestionsRepository)
  })

  it('should be able to edit a question', async () => {
    const newQuestion = makeQuestion(
      {
        authorId: new UniqueEntityId('author-1'),
      },
      new UniqueEntityId('question-1'),
    )

    inMemoryQuestionsRepository.create(newQuestion)

    await sut.execute({
      questionId: newQuestion.id.toString(),
      authorId: 'author-1',
      title: 'Updated Title',
      content: 'Updated Content',
    })

    expect(inMemoryQuestionsRepository.items[0]).toMatchObject({
      title: 'Updated Title',
      content: 'Updated Content',
    })
  })

  it('should not be able to edit a question from another user', async () => {
    const newQuestion = makeQuestion(
      {
        authorId: new UniqueEntityId('author-1'),
      },
      new UniqueEntityId('question-1'),
    )

    inMemoryQuestionsRepository.create(newQuestion)

    const result = await sut.execute({
      questionId: newQuestion.id.toString(),
      authorId: 'author-2',
      title: 'Updated Title',
      content: 'Updated Content',
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(NotAllowedError)
  })
})
